package pokemon.ps1.repository;

import pokemon.ps1.users.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepo extends JpaRepository<User, String> {
    User findByLogin(String login);
}
