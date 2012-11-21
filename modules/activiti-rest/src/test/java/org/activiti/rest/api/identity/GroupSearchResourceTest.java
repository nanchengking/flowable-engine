package org.activiti.rest.api.identity;

import org.activiti.rest.BaseRestTestCase;
import org.codehaus.jackson.JsonNode;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;

public class GroupSearchResourceTest extends BaseRestTestCase {

  public void testGetAllGroups() throws Exception {
    ClientResource client = getAuthenticatedClient("groups");
    Representation response = client.get();
    JsonNode responseNode = objectMapper.readTree(response.getStream());
    assertNotNull(responseNode);
    assertEquals(1, responseNode.get("total").asInt());
    JsonNode groupNode = responseNode.get("data").get(0);
    assertEquals("Administrators", groupNode.get("name").asText());
  }
  
  public void testGetGroups() throws Exception {
    ClientResource client = getAuthenticatedClient("groups?searchText=adm");
    Representation response = client.get();
    JsonNode responseNode = objectMapper.readTree(response.getStream());
    assertNotNull(responseNode);
    assertEquals(1, responseNode.get("total").asInt());
    JsonNode groupNode = responseNode.get("data").get(0);
    assertEquals("Administrators", groupNode.get("name").asText());
  }
}
