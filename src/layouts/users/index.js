import MDBox from "components/MDBox";
import axios from "../../axios/axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userTableData from "./data/usersTableData";
import DataTable from "examples/Tables/DataTable";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import "./styles/index.css";
function Users() {
	const [search, setSearch] = useState("");
	const { columns, rows } = userTableData({ search });

	const handleSearch = async (e) => {
		setSearch(e.target.value);
	};

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox
								mx={2}
								mt={-3}
								py={3}
								px={2}
								variant='gradient'
								bgColor='info'
								borderRadius='lg'
								coloredShadow='info'>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}>
									<MDTypography variant='h6' color='white'>
										Users' Table
									</MDTypography>
									<MDBox pr={1}>
										<input
											className='user-search'
											type='search'
											name='search'
											id='search'
											placeholder='search users'
											onChange={handleSearch}
										/>
									</MDBox>
								</div>
							</MDBox>

							<MDBox pt={3}>
								<DataTable
									table={{ columns, rows }}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>
				</Grid>
			</MDBox>
		</DashboardLayout>
	);
}

export default Users;
