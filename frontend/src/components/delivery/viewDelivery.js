import React,{useState, useEffect} from "react";
import axios from "axios";

// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// import ReactHTMLTableToExcel from 'react-html-table-to-excel'; //report generation

function ViewDelivery(){




// Creating states for assigning user input data
const [router, SetRouter] = useState([]);
   
  useEffect(() => {
    function getRouter() {
        axios.get("http://localhost:3000/api/v1/deliveries").then((res)=>{
            
            console.log(res.data.deliveries)
            SetRouter(res.data.deliveries);
            
        }).catch((err)=>{
            alert(err.message);
        })
    }

    getRouter();
  }, [router])


   let test = router[0].order_id
   let test1 = router[1].order_id
   let test2 = router[2].order_id
   

  // Delete Function

//   const onDelete = (id) =>{



//     confirmAlert({

//         title: 'Confirm to Delete',

//         message: 'Are you sure you want to delete this.',

//         buttons: [

//           {

//             label: 'Yes',

//             onClick: () => axios.delete(`http://localhost:8070/trip/delete/${id}`).then((res) =>{

//                 //alert("Deleted successfully!");

//                 //this.retrievePosts();

//               })

//           },

//           {

//             label: 'No',

           

//           }

//         ]

//       });}

  
    return (
<>
<h1>HEllo</h1>
<p>{test}</p>
<p>{test1}</p>
<p>{test2}</p>
</>


    //     <div>

    // <div>

    // <label style={{ marginLeft:'40%',marginRight:'15px', fontSize:'25px', fontWeight:'bold',marginTop:'40px'}}>VIEW DELIVERY</label>
       
    //     <table className="table table-striped" style={{ marginTop: 20 }} id="view_routes">
    //     <thead>
    //         <tr>
    //             <th>No.</th>
    //         <th>Route ID</th>
    //         <th>Customer Name</th>
    //         <th>Guide Name</th>
    //         <th>Start Date</th>
    //         <th>End Date</th>
    //         <th>Start Place</th>
    //         <th>End Place</th>
    //         <th>Route Details</th>
    //         <th>Action</th>
    //         </tr>
    //     </thead>
    //     <tbody>

    //         {
    //             router.map((router,index) =>(
    //                 <tr key={index}>
    //                     {/* <td></td> */}
    //                     <th scope = "row">{index+1}</th>
    //                 <td>{router.route_ID}</td>
    //                 <td>{router.cust_name}</td>
    //                 <td >{router.guide_name}</td>
    //                 <td >{router.startDate}</td>
    //                 <td>{router.endDate}</td>
    //                 <td>{router.startPlace}</td>
    //                 <td>{router.endPlace}</td>
    //                 <td>{router.Locations}</td>
    //                 <td>
    //                 <a href={`/updateTrip/${router._id}`}><button type="/updateTrip"  className="btn btn-primary" >UPDATE</button> </a>
    //                 <br></br>
    //                 <a className="btn btn-danger" href="#" onClick={() =>onDelete(router._id)}>
    //                                             <i className="far fa-trash-alt"></i>&nbsp;Delete
    //                                         </a>

    //                 </td>
    //                 </tr>
    //             ))
    //         }
            


    //     </tbody>
    //     </table>


    //     <a  href="/AdminPanel"><button type="button" style={{ marginLeft:'45%',marginTop:'2%',marginBottom:'2%'}} className="btn btn-primary">Back</button></a>
    //     <button  type="button" className="btn btn-info" style={{marginLeft:'30px', marginRight:'0px' }}>
    //     <ReactHTMLTableToExcel
    //                 id="test-table-xls-button"
    //                 className="btn btn-info"
    //                 table="view_routes"
    //                 filename="routes_details"
    //                 sheet="routes_details_xls"
    //                 buttonText="Download Trips Details"
    //                  style={{marginLeft:'0px', marginRight:'0px',padding:'1px 1px'}}/>
                    
    //                 </button>


    // </div></div>
  
       
    )
}

export default ViewDelivery;