import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

function Products() {
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3}></MDBox>
		</DashboardLayout>
	);
}

export default Products;
