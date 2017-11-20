<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="chi.bean.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBoizxb0FMB89793hKaM_fC1lX40vS3eJE">
	
</script>
<script src="https://www.gstatic.com/charts/loader.js"></script>


<script type='text/javascript'> 
  var inputState = false; 
</script>

<%
	SiteList siteList = (SiteList) request.getAttribute("SiteList");
	State state = (State) request.getAttribute("State");
%>

<%String inputState1 = state.getName(); 

%>
<%
System.out.println("Check " + inputState1);
%>

<script type="text/javascript" language="javascript"
	src="SiteDetails.js"></script>

<style>

 #mapcontainer path:hover{fill: #da8f20;} 

table, td {
	border: 1px solid black;
}

#list {
	z-index: 9999;
}
}
</style>

</head>
<body>

	<input type="hidden" name="stateValue" id="stateValue"
		value="<%=state.getName()%>" />

	<input type="hidden" name="siteAddress1" id="siteAddress1"
		value="<%
				for (Site s : siteList.getSitesList()) {
				//System.out.println("Array check " + s.getSiteName());
				%>
				<%=s.getAddress()+"|" %>
				
				

			<%	}
			%>" />

	<div id="list" style="float: left;">
		<ul class="regions" id="regions"><%=state.getName() %>
			<%
							System.out.println("What is happening " + state.getName());
							for (Site s : siteList.getSitesList()) {
								//System.out.println("Final page " + s.getSiteName() + "\n");
						%>
			<li value="<%=s.getSiteName()%>"><a href="<%=s.getUrl()%>"><%=s.getSiteName()%></a></li>
			<%-- <li value="<%=s.getAddress()%>"><%=s.getAddress()%></li> --%>
			<%
							}
						%>
		</ul>

	</div>

	<div id="mapcontainer" style="float: right;"></div>


</body>
</html>