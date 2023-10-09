
function deleteEvent(){
    let btn=document.getElementById('DeleteBtn');
    let id=btn.getAttribute('data-id');

    axios.delete('/events/delete/'+id)
    .then((res)=>{
        console.log(res.data);
        alert('Event was Deleted');
        window.location.href = '/events/index';
        
    })
    .catch((err)=>{
        alert('Some thing went Wrong During the Delete');
        window.location.href = '/events/index';

    })
}


//to preview of the image of avatar proofile 
function readURL(input){
    if(input.files && input.files[0]){
        var reader=new FileReader();
        reader.onload= function (e){
            let image=document.getElementById('imagePlaceHolder');
            image.style.display="block";
            image.src=e.target.result;
        }
        reader.readAsDataURL(input.files[0])
    }
}