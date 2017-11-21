package org.nextup.backend.geocoder.nominatim;

import com.google.gson.Gson;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.NoConnectionReuseStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.nextup.backend.geocoder.nominatim.dto.SearchResult;
import org.nextup.backend.geocoder.nominatim.dto.SearchResultList;
import org.nextup.backend.util.Streams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

/**
 * This geo-coder-client uses <a hre="https://nominatim.openstreetmap.org">Nominatim</a> to resolve
 * locations and addresses into GPS coordinates.
 */
@Configuration
public class NominatimGeoCoderClient {

	private static final Logger Log = LoggerFactory.getLogger(NominatimGeoCoderClient.class);

	@Value("${geocoder.nominatim.url}")
	private URL nominatimUrl;
	@Value("${geocoder.nominatim.userAgent}")
	private String nominatimUserAgent;
	@Value("${geocoder.nominatim.proxy.host:null}")
	private String nominatimProxyHost;
	@Value("${geocoder.nominatim.proxy.port:0}")
	private int nominatimProxyPort;

	protected HttpClient createClient() {
		return HttpClientBuilder.create()
			.setUserAgent(nominatimUserAgent)
			.setConnectionReuseStrategy(new NoConnectionReuseStrategy()).build();
	}

	protected HttpHost createHost() {
		return new HttpHost(nominatimUrl.getHost(), nominatimUrl.getPort());
	}

	public SearchResult resolve(String query) {
		try {
			HttpGet request = new HttpGet("/search?format=json&limit=1&addressdetails=1&q=" + URLEncoder.encode(query, "UTF-8"));
			request.addHeader("Accept", "application/json");
			configureProxy(request);
			HttpResponse response = createClient().execute(createHost(), request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				String content = Streams.readAsString(response.getEntity().getContent());
				List<SearchResult> list = new Gson().fromJson(content, SearchResultList.class);
				return list.size() > 0 ? list.get(0) : null;
			} else {
				Log.error("Nominatim geo-coding-request got HTTP-" + response.getStatusLine().getStatusCode() + " " + response.getStatusLine().getReasonPhrase() + " " + Streams.readAsString(response.getEntity().getContent()));
			}
		} catch (IOException e) {
			Log.error("Could not perform request to nominatim", e);
		}
		return null;
	}

	protected <Request extends HttpRequestBase> Request configureProxy(Request request) {
		if (nominatimProxyHost != null && !nominatimProxyHost.isEmpty() && nominatimProxyPort != 0) {
			Log.info("using proxy " + nominatimProxyHost + ":" + nominatimProxyPort);
			request.setConfig(RequestConfig.custom().setProxy(new HttpHost(nominatimProxyHost, nominatimProxyPort)).build());
		} else {
			Log.info("using no proxy");
		}
		return request;
	}
}
