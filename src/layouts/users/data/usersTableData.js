import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { toast } from "react-toastify";
import "../styles/index.css";
import moment from "moment";

export default function data(props) {
	const [users, setUsers] = useState([]);
	const getUsers = async () => {
		try {
			let url = "/users";

			if (props.search) {
				url += `?search=${props.search}`;
			}

			const result = await axios.get(url);

			if (result.data.success) {
				setUsers(result.data.users);
			} else {
				toast.error(result.data.message);
			}
		} catch (error) {
			console.error(error, "<<-- error in user list fetch");
			toast.error(error?.response?.data.message);
		}
	};

	useEffect(() => {
		getUsers();
	}, [props.search]);

	const Author = ({ image, name, email }) => (
		<MDBox display='flex' alignItems='center' lineHeight={1}>
			<MDAvatar src={image} name={name} size='sm' />
			<MDBox ml={2} lineHeight={1}>
				<MDTypography
					display='block'
					variant='button'
					fontWeight='medium'>
					{name}
				</MDTypography>
				<MDTypography variant='caption'>{email}</MDTypography>
			</MDBox>
		</MDBox>
	);

	const Job = ({ title, description }) => (
		<MDBox lineHeight={1} textAlign='left'>
			<MDTypography
				display='block'
				variant='caption'
				color='text'
				fontWeight='medium'>
				{title}
			</MDTypography>
			<MDTypography variant='caption'>{description}</MDTypography>
		</MDBox>
	);

	useEffect(() => {
		console.log(users, "<<-- users");
	}, [users]);

	const userData = users?.map((user) => {
		return {
			author: user.name,
			email: user.email,
			phone: user.phone ?? "--",
			createdAt: moment(user.createdAt).format("L"),
			status: user.status ? (
				<MDBox ml={-1}>
					<MDBadge
						badgeContent='Activated'
						color='success'
						variant='gradient'
						size='sm'
					/>
				</MDBox>
			) : (
				<MDBox ml={-1}>
					<MDBadge
						badgeContent='Deactivated'
						color='dark'
						variant='gradient'
						size='sm'
					/>
				</MDBox>
			),
			action: (
				<div className='actions'>
					<MDTypography
						className='actions-text'
						component='a'
						href='#'
						variant='caption'
						color='text'
						fontWeight='medium'>
						Edit
					</MDTypography>

					<MDTypography
						className='actions-text'
						component='a'
						href='#'
						variant='caption'
						color='text'
						fontWeight='medium'>
						Delete
					</MDTypography>
				</div>
			),
		};
	});

	return {
		columns: [
			{ Header: "name", accessor: "author", align: "left" },
			{ Header: "email", accessor: "email", align: "left" },
			{ Header: "phone", accessor: "phone", align: "left" },
			{ Header: "createdAt", accessor: "createdAt", align: "center" },
			{ Header: "status", accessor: "status", align: "center" },
			{ Header: "action", accessor: "action", align: "center" },
		],

		rows: userData,
	};
}
