
function deleteEvent(){
    let btn=document.getElementById('DeleteBtn');
    let id=btn.getAttribute('data-id');

    axios.delete('/events/delete/'+id)
    .then((res)=>{
        console.log(res.data);
        // alert('Event was Deleted');
        window.location.href = '/events';
        
    })
    .catch((err)=>{
        alert('Some thing went Wrong During the Delete');
        window.location.href = '/events';

    })
}