<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="chi.bean.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBoizxb0FMB89793hKaM_fC1lX40vS3eJE"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<script type='text/javascript'>
	var inputState = false;
</script>
<%
	SiteList siteList = (SiteList) request.getAttribute("SiteList");
	State state = (State) request.getAttribute("State");
%>
<%
	String inputState1 = state.getName();
%>

<script type="text/javascript" language="javascript"
	src="SiteDetails.js"></script>
<style>
#mapcontainer path:hover {
	fill: #da8f20;
}

#mapcontainer {
	position: fixed;
    top: 2em;
    right: 0em;
    bottom: 1em;
    height:100%;
    
}

table, td {
	border: 1px solid black;
}


#list {
	z-index: 9999;
}

#myDiv{
	display:none;
    width: 100%;
    padding: 50px 0;
    text-align: center;
    background-color: lightblue;
    margin-top: 20px;
}
li:hover  #myDiv {
	display: block;
}
</style>

</head>
<body>
	<input type="hidden" name="stateValue" id="stateValue"
		value="<%=state.getName()%>" />

	<input type="hidden" name="siteAddress1" id="siteAddress1"
		value="<%for (Site s : siteList.getSitesList()) {
				%>
				<%=s.getSiteName()+","%>
				<%=s.getAddress()+ "|"%>
			<%}%>" />
			
	<input type="hidden" name="siteUrl" id="siteUrl"
		value="<%for (Site s : siteList.getSitesList()) {
				//System.out.println("Array check " + s.getSiteName());%>
				<%=s.getUrl() + "|"%>
			<%}%>" />
		

	<div id="list" style="float: left;">
		<ul class="regions" id="regions"><%=state.getName()%>
			<%
				for (Site s : siteList.getSitesList()) {
			%>
			<li id="siteList" value="<%=s.getSiteName()%>"><a
				href="<%=s.getUrl()%>" onmouseover="style.color='green'"
				onmouseout="style.color='blue'"><%=s.getSiteName()%></a><br>
				
				<div id = "myDiv">
					<%=s.getSiteName() %><br>
					
					<%if(s.getAddress() == "null"){%>
						-<br>
					<%}else{%>
						<%=s.getAddress() %><br>
					<%} %>
					
					<%if(s.getSitePhone() == "null"){%>
						-<br>
					<%}else{%>
						<%=s.getSitePhone() %><br>
					<%} %>
					
					<%if(s.getFinalModelname() == "null"){%>
						-<br>
					<%}else{%>
						<%=s.getFinalModelname() %><br>
					<%} %>
				
					<%if(s.getApproval() == "null"){%>
						-<br>
					<%}else{%>
						<b><%=s.getApproval() %></b><br>
					<%} %>
					
					
				</div>
					
				</li>
			<%
				}
			%>
		</ul>

	</div>

	<div id="mapcontainer" style="height:100%"></div>


</body>
</html>