package pokemon.ps1.security;

public class TokenVerificationException extends RuntimeException {
    public TokenVerificationException(String message, Throwable cause) {
        super(message, cause);
    }
}
