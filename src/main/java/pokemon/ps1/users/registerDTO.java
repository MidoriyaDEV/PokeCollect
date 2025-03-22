package pokemon.ps1.users;

public record registerDTO(String login, String password, UserRole role) {
    public registerDTO {
        if (login == null || login.isBlank()) {
            throw new IllegalArgumentException("Login cannot be null or empty");
        }
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
    }
}
