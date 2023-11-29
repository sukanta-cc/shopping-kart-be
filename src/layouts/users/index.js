import MDBox from "components/MDBox";
import axios from "../../axios/axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userTableData from "./data/usersTableData";
import DataTable from "examples/Tables/DataTable";
import {
	Card,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import "./styles/index.css";
function Users() {
	const [status, setStatus] = useState("all");
	const [search, setSearch] = useState("");
	const { columns, rows } = userTableData({ search, status });

	const handleSearch = async (e) => {
		setSearch(e.target.value);
	};

	const handleStatusChange = (e) => {
		setStatus(e.target.value);
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
									<MDBox
										pr={1}
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<MDBox pr={1}>
											<FormControl fullWidth>
												{/* <InputLabel id='demo-simple-select-label'>
													Status
												</InputLabel> */}
												<Select
													className='user-filter'
													placeholder='Enter your age'
													labelId='demo-simple-select-label'
													id='demo-simple-select'
													value={status}
													// label='Age'
													onChange={
														handleStatusChange
													}>
													<MenuItem value={"all"}>
														Select Status
													</MenuItem>
													<MenuItem value={"true"}>
														Activated
													</MenuItem>
													<MenuItem value={"false"}>
														Deactivated
													</MenuItem>
												</Select>
											</FormControl>
										</MDBox>
										<input
											className='user-search'
											type='search'
											name='search'
											id='search'
											placeholder='Search users by name/email/phone number'
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
