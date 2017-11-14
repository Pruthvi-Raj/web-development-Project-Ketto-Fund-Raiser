<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="chi.bean.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<%
	SiteList siteList = (SiteList) request.getAttribute("SiteList");
	State state = (State) request.getAttribute("State");
%>

</head>
<body>
	<ul><%=state.getName() %>
		<%System.out.println("What is happening" + state.getName());
			for (Site s : siteList.getSitesList()) {
				System.out.println("Final page " + s.getSiteName() + "\n");
		%>
		<li value = "<%=s.getSiteName()%>"><%=s.getSiteName() %></li>
		<%
			}
		%>
	</ul>



</body>
</html>