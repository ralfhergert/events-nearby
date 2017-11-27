package org.nextup.backend.filter;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * This filter manipulates outgoing responses changing the response to HTTP-204 is there is no content.
 */
@Component
public class NoContentFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
		filterChain.doFilter(httpServletRequest, httpServletResponse);
		if (httpServletResponse.getContentType() == null ||
			httpServletResponse.getContentType().isEmpty()) {
			httpServletResponse.setStatus(HttpStatus.NO_CONTENT.value());
		}
	}
}
