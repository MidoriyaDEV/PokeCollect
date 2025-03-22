package pokemon.ps1.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pokemon.ps1.repository.UserRepo;
import pokemon.ps1.service.autorizationService;
import pokemon.ps1.users.User;
import pokemon.ps1.users.authDTO;
import pokemon.ps1.users.registerDTO;
import pokemon.ps1.users.loginResponseDTO;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("auth")
public class authController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepo repository;

    @Autowired
    private autorizationService authService;

    @Autowired
    TokenService tokenService;

    private static final Set<String> invalidTokens = new HashSet<>();

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid authDTO data) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new loginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid registerDTO data) {

        if (this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encodedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = authService.createUser(data.login(), encodedPassword);
        this.repository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/logout/")
    public ResponseEntity logout(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido ou ausente.");
        }

        token = token.replace("Bearer ", "");

        invalidTokens.add(token);

        return ResponseEntity.ok("Logout realizado com sucesso.");
    }

    public static boolean isTokenInvalid(String token) {
        return invalidTokens.contains(token);
    }
}
