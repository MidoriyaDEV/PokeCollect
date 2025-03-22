package pokemon.ps1.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pokemon.ps1.repository.UserRepo;

import java.io.IOException;

@Slf4j
@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepo userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.debug("Entering SecurityFilter.doFilterInternal");

            var token = this.recoverToken(request);
            if (token != null) {
                var login = this.getLoginFromToken(token);
                if (login != null) {
                    UserDetails user = userRepo.findByLogin(login);

                    if (user != null) {
                        var auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    } else {
                        log.error("User not found for login: {}", login);
                    }
                } else {
                    log.error("Invalid token: {}", token);
                }
            }

            filterChain.doFilter(request, response);
            log.debug("Exiting SecurityFilter.doFilterInternal");
        } catch (JWTVerificationException ex) {
            log.error("Invalid or expired token: {}", ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token");
        } catch (Exception e) {
            log.error("Error in SecurityFilter.doFilterInternal", e);
            throw new ServletException("Error in SecurityFilter.doFilterInternal", e);
        }
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;

        return authHeader.replace("Bearer ", "");
    }

    private String getLoginFromToken(String token) {
        try {
            return tokenService.validateToken(token);
        } catch (TokenVerificationException e) {
            log.error("Error validating token: {}", e.getMessage());
            return null;
        }
    }
}
