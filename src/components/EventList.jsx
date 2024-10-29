
import {
  Card,
  CardContent,

  Typography,

  Button,
} from '@mui/material';


const EventList = ({handleAddEvent,openForm,eventToEdit,events, handleCloseForm,onEdit, deleteEvent,setRefresh }) => {
  
 
  
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      
      {events.map((event) => (
        <Card
          key={event.id}
          className="shadow-md border border-gray-200 bg-white" // Set white background
        >
          <CardContent>
            <div className='mb-3'>
            <Typography variant="h5" className=" font-bold text-orange-500"> {/* Set text color to orange */}
              {event.title}
            </Typography>
            </div>
            <Typography  variant="h7" className="text-gray-500 "> {/* Set text color to orange */}
              {event.description}
            </Typography>
         
          <div className='mt-3'>
            <Typography variant="h9"  className=" text-orange-400"> {/* Changed color for better contrast */}
              {new Date(event.date).toLocaleString()}
            </Typography>
         </div>
         
          <div className='justify-around flex mt-5'>
            <Button  
            onClick={()=>{onEdit(event.id)}}
        variant='contained'         className="bg-orange-custom" // Use custom class for consistency
        >edit</Button>
            <Button variant='outlined' onClick={()=>{deleteEvent(event.id)}}        >remove</Button>
            
            </div>
          </CardContent>
        
        </Card>
      ))}
     
    </div>
  );
};

export default EventList;
