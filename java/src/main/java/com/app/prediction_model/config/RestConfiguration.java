package com.app.prediction_model.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.app.prediction_model.model.User;

/**
 * Configuration class for Spring Data REST.
 * <p>
 * This class customises the behaviour of Spring Data REST by explicitly
 * exposing entity identifiers in JSON responses. By default, Spring Data REST
 * hides entity IDs, which can make it difficult for a frontend application
 * to reference and link entities.
 * </p>
 * <p>
 * Exposing IDs allows the frontend to correctly identify and manipulate
 * {@link Student}, {@link Module}, and {@link Grade} entities when performing
 * create, update, and delete operations.
 * </p>
 */
@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {

  /**
   * Configures Spring Data REST to expose entity identifiers.
   *
   * @param config the {@link RepositoryRestConfiguration} to customise
   * @param cors the {@link CorsRegistry} used to configure CORS mappings
   */
  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
      CorsRegistry cors) {
    config.exposeIdsFor(User.class);
  }
}