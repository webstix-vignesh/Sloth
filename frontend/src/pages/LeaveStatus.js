import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";

import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  // Upload,
  message,
  // Progress,
  Button,
  Avatar,
  // Typography,
} from "antd";

import axios from 'axios';
import { API } from "../constant";
import { getToken } from "../helpers";

// import { ToTopOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

// Images
// import ava1 from "../assets/images/logo-shopify.svg";
// import ava2 from "../assets/images/logo-atlassian.svg";
// import ava3 from "../assets/images/logo-slack.svg";
// import ava5 from "../assets/images/logo-jira.svg";
// import ava6 from "../assets/images/logo-invision.svg";
// import face from "../assets/images/face-1.jpg";
// import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
// import face4 from "../assets/images/face-4.jpg";
// import face5 from "../assets/images/face-5.jpeg";
// import face6 from "../assets/images/face-6.jpeg";
// import pencil from "../assets/images/pencil.svg";
import Main from "../components/layout/Main";


// const { Title } = Typography;



// const formProps = {
//   name: "file",
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };
// table code start




// const data = [
//   {
//     key: "1",
// date: (
//       <>
//        <Avatar.Group>
//           {/* <Avatar
//             className="shape-avatar"
//             shape="square"
//             size={40}
//             src={face3}
//           ></Avatar> */}
//           <div className="avatar-info">
//             {/* <Title level={5}>From: 23/02/2024 <br/> To: 25/02/2024 </Title> */}
//             <p><b>From:</b> 26/02/2024 <br/><b>To:</b> 28/02/2024 </p>
//           </div>
//         </Avatar.Group>{" "}
//       </>
//     ),
//     type: (
//             <>
//               <div className="author-info">{" "} SL</div>
//              </>
//     ),

//     function: (
//       <>
//         <div className="author-info">
//         {" "}Karthick
//         </div>
//       </>
//     ),

//     status: (
//       <>
//         <Button style={buttonPending}>PENDING</Button>

//       </>
//     ),
//     applied: (
//       <>
//         <div className="ant-employed">
//           <span>{" "} 23/04/18</span>
//           {/* <a href="#pablo">Edit</a> */}
//         </div>
//       </>
//     ),
//     comment: (
//       <>
//         <div className="ant-employed">
//           <span>Your leave request is currently under review.</span>
//           {/* <a href="#pablo">Edit</a> */}
//         </div>
//       </>
//     ),
//   },
// ];

// const data = [
//   {
//     key: "1",
// date: (
//       <>
//        <Avatar.Group>
//           {/* <Avatar
//             className="shape-avatar"
//             shape="square"
//             size={40}
//             src={face3}
//           ></Avatar> */}
//           <div className="avatar-info">
//             {/* <Title level={5}>From: 23/02/2024 <br/> To: 25/02/2024 </Title> */}
//             <p><b>From:</b> 26/02/2024 <br/><b>To:</b> 28/02/2024 </p>
//           </div>
//         </Avatar.Group>{" "}
//       </>
//     ),
//     type: (
//             <>
//               <div className="author-info">SL</div>
//              </>
//     ),

//     function: (
//       <>
//         <div className="author-info">
//           Karthick
//         </div>
//       </>
//     ),

//     status: (
//       <>
//         <Button style={buttonPending}>PENDING</Button>

//       </>
//     ),
//     applied: (
//       <>
//         <div className="ant-employed">
//           <span>23/04/18</span>
//           {/* <a href="#pablo">Edit</a> */}
//         </div>
//       </>
//     ),
//     comment: (
//       <>
//         <div className="ant-employed">
//           <span>Your request is accepted</span>
//           {/* <a href="#pablo">Edit</a> */}
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "2",
// date: (
//       <>
//         <Avatar.Group>
//           {/* <Avatar
//             className="shape-avatar"
//             shape="square"
//             size={40}
//             src={face3}
//           ></Avatar> */}
//           <div className="avatar-info">
//             {/* <Title level={5}>From: 23/02/2024 <br/> To: 25/02/2024 </Title> */}
//             <p><b>From:</b> 28/02/2024 <br/><b>To:</b> 01/03/2024 </p>
//         </div>
//         </Avatar.Group>{" "}
//       </>
//     ),

//     type: (
//       <>
//         <div className="author-info">PL</div>
//        </>
//    ),

//     function: (
//       <>
//         <div className="author-info">
//           Sankar
       
//         </div>
//       </>
//     ),

//     status: (
//       <>
//         <Button style={buttonSuccess}>APPROVED</Button>
//       </>
//     ),
//     applied: (
//       <>
//         <div className="ant-employed">
//           <span>23/12/20</span>
//           {/* <a href="#pablo">Edit</a> */}
//         </div>
//       </>
//     ),
//   },

// ];


// project table start
// const project = [
//   {
//     title: "COMPANIES",
//     dataIndex: "name",
//     width: "32%",
//   },
//   {
//     title: "BUDGET",
//     dataIndex: "age",
//   },
//   {
//     title: "STATUS",
//     dataIndex: "address",
//   },
//   {
//     title: "COMPLETION",
//     dataIndex: "completion",
//   },
// ];
// const dataproject = [
//   {
//     key: "1",

// date: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Spotify Version</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$14,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">working</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={30} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "2",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Progress Track</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$3,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">working</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={10} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "3",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}> Jira Platform Errors</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">Not Set</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">done</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={100} size="small" format={() => "done"} />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "4",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}> Launch new Mobile App</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$20,600</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">canceled</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress
//             percent={50}
//             size="small"
//             status="exception"
//             format={() => "50%"}
//           />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "5",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Web Dev</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$4,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">working</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={80} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },

//   {
//     key: "6",
//     name: (
//       <>
//         <Avatar.Group>
//           <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
//           <div className="avatar-info">
//             <Title level={5}>Redesign Online Store</Title>
//           </div>
//         </Avatar.Group>
//       </>
//     ),
//     age: (
//       <>
//         <div className="semibold">$2,000</div>
//       </>
//     ),
//     address: (
//       <>
//         <div className="text-sm">canceled</div>
//       </>
//     ),
//     completion: (
//       <>
//         <div className="ant-progress-project">
//           <Progress percent={0} size="small" />
//           <span>
//             <Link to="/">
//               <img src={pencil} alt="" />
//             </Link>
//           </span>
//         </div>
//       </>
//     ),
//   },
// ];

function Tables() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
 const [rows, setRows] = useState([]);
 const { user } = useAuthContext();

//  const buttonSuccess = {
//   backgroundColor: '#7bed9f',
//   borderColor: '#7bed9f', 
//   color: 'black', 
// };

// const buttonPending = {
//   backgroundColor: '#f6e58d',
//   borderColor: '#f6e58d', 
//   color: 'black', 
// };
 const getStatusStyle = (leaveStatus) => {
  switch (leaveStatus.toUpperCase()) {
    case 'PENDING':
      return {
        backgroundColor: '#f6e58d',
        borderColor: '#f6e58d', 
        color: 'black', 
      };
    case 'APPROVED':
      return {
        backgroundColor: '#7bed9f',
        borderColor: '#7bed9f', 
        color: 'black', 
      };
    case 'REJECTED':
      return {
        backgroundColor: 'red',
        borderColor: 'red', 
        color: '#ffffff', 
      };
    default:
      return {};
  }
};

 useEffect(() => {

  const fetchDataFromAPI = async () => {
    try {
      if (!user) return; // If user is not available, exit early
      
      const userId = user.id;
      const response = await fetch(`${API}/leaves`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const responseData = await response.json();
      const data = responseData.data; // Access the data array within the response object

      console.log(userId)
      // Check if data is an array
      if (Array.isArray(data)) {
        const filteredRows = data
          .filter(item => parseInt(userId) === parseInt(item.attributes.leave_user_id)) // Filter items based on userID
          .sort((a, b) => b.id - a.id) 
          .map(item => ({
            key: item.attributes.id,
            date: (
              <>
                <Avatar.Group>
                  <div className="avatar-info">
                  <p><b>From:</b> {item.attributes.start_date} <br/><b>To:</b>  {item.attributes.end_date} </p>
                  </div>
                </Avatar.Group>{" "}
              </>
            ),
            type: (
              <>
                <div className="author-info">{" "} {item.attributes.leave_type}</div>
              </>
            ),
            function: (
              <>
                <div className="author-info">{" "}{item.attributes.reports_to}</div>
              </>
            ),
            status: (
              <>
               <Button style={getStatusStyle(item.attributes.leave_status)}>
                   {item.attributes.leave_status}
          </Button>
                {/* <Button style={buttonPending}>{item.attributes.leave_status}</Button> */}
              </>
            ),
            applied: (
              <>
                <div className="ant-employed">
                  <span>{moment(item.attributes.createdAt).format('DD-MM-YYYY')}</span>
                </div>
              </>
            ),
            comment: (
              <>
                <div className="ant-employed">
                  <span>{item.attributes.leave_comments}</span>
                </div>
              </>
            ),
          }));
      
        console.log('Filtered Rows:', filteredRows); // Log filtered rows to inspect
      
        setRows(filteredRows);
      } else {
        console.error('Data returned from API is not an array:', data);
      }
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataFromAPI();
}, [user]);







  // const rows = [
  //     {
  //       key: `1`,
  //   date: (
  //         <>
  //          <Avatar.Group>
  //             {/* <Avatar
  //               className="shape-avatar"
  //               shape="square"
  //               size={40}
  //               src={face3}
  //             ></Avatar> */}
  //             <div className="avatar-info">
  //               {/* <Title level={5}>From: 23/02/2024 <br/> To: 25/02/2024 </Title> */}
  //               <p><b>From:</b> 22/04/2024 <br/><b>To:</b> 23/04/2024 </p>
  //             </div>
  //           </Avatar.Group>{" "}
  //         </>
  //       ),
  //       type: (
  //               <>
  //                 <div className="author-info">{" "} SL</div>
  //                </>
  //       ),
    
  //       function: (
  //         <>
  //           <div className="author-info">
  //           {" "}Karthick
  //           </div>
  //         </>
  //       ),
    
  //       status: (
  //         <>
  //           <Button style={buttonPending}>PENDING</Button>
    
  //         </>
  //       ),
  //       applied: (
  //         <>
  //           <div className="ant-employed">
  //             <span>{" "} 23/04/18</span>
  //             {/* <a href="#pablo">Edit</a> */}
  //           </div>
  //         </>
  //       ),
  //       comment: (
  //         <>
  //           <div className="ant-employed">
  //             <span>Your leave request is currently under review.</span>
  //             {/* <a href="#pablo">Edit</a> */}
  //           </div>
  //         </>
  //       ),
  //     },
  //   ];
    


const columns = [
  {
    title: "LEAVE DATE",
    dataIndex: "date",
    key: "date",
    width: "22%",
  },
  {
    title: "LEAVE TYPE",
    dataIndex: "type",
    key: "type",
 
  },
  {
    title: "LEAVE APPROVER",
    dataIndex: "function",
    key: "function",
  },

 
  {
    title: "APPLIED ON",
    key: "applied",
    dataIndex: "applied",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "COMMENT",
    key: "comment",
    dataIndex: "comment",
  }
];




  return (
    <>
    
  <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Leave Status"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">RECENT</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={rows}
                  pagination={false}
                  className="ant-border-space"
                />
              
              </div>
            </Card>

            {/* <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div className="uploadfile pb-15 shadow-none">
                <Upload {...formProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </div>
            </Card> */}
            
          </Col>
        </Row>
      </div>
      </Main>
    </>
  );
}

export default Tables;
