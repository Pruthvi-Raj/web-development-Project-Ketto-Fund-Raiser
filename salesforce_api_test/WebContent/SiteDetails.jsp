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


<script type='text/javascript' > 
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
	#mapcontainer{
		padding-top: 0px
	}
	#map{
		padding-top: 0px;
	}

	table,  td {
    border: 1px solid black;
}
</style>

</head>
<body>


	<div id="mapcontainer" style="float: right;"></div>
	
	<div style="position: absolute;">
			<ul class="regions" id="regions"><%=state.getName() %>
						<%
							System.out.println("What is happening " + state.getName());
							for (Site s : siteList.getSitesList()) {
								//System.out.println("Final page " + s.getSiteName() + "\n");
						%>
						<li value="<%=s.getSiteName()%>"><%=s.getSiteName()%></li>
						<%
							}
						%>
					</ul>
			 
	</div>
			
	

	


	






</body>
</html>