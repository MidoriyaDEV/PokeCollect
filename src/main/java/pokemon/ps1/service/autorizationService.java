package pokemon.ps1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pokemon.ps1.repository.UserRepo;
import pokemon.ps1.users.UserRole;
import pokemon.ps1.users.User;

@Service
public class autorizationService implements UserDetailsService {

    @Autowired
    UserRepo repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByLogin(username);
    }

    public User createUser(String login, String password){
        return repository.save(new User(login,password, UserRole.USER));
    }
}
