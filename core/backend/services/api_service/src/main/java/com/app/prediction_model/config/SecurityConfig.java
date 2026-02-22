package com.app.prediction_model.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Security configuration for the application.
 * <p>
 * This class configures Spring Security to:
 * <ul>
 *   <li>Disable CSRF protection (suitable for stateless REST APIs)</li>
 *   <li>Enable Cross-Origin Resource Sharing (CORS)</li>
 * </ul>
 * </p>
 */
@Configuration
public class SecurityConfig {

  /**
   * Configures the security filter chain.
   * <p>
   * CSRF protection is disabled because the application exposes a REST API
   * consumed by a separate frontend. All incoming requests are permitted
   * without authentication.
   * </p>
   *
   * @param http the {@link HttpSecurity} to configure
   * @return the configured {@link SecurityFilterChain}
   * @throws Exception if a security configuration error occurs
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf((csrf) -> csrf.disable()).cors(withDefaults());

    return http.build();
  }

  /**
   * Defines the CORS configuration for the application.
   * <p>
   * This configuration allows requests from any origin, with any headers
   * and HTTP methods. Credentials are not permitted.
   * </p>
   * <p>
   * This setup enables communication between the backend API and a
   * separately hosted frontend during development.
   * </p>
   *
   * @return a {@link CorsConfigurationSource} containing the CORS settings
   */
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOriginPatterns(Arrays.asList("*"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setAllowedMethods(Arrays.asList("*"));
    config.setAllowCredentials(false);
    config.applyPermitDefaultValues();

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return source;
  }
}
