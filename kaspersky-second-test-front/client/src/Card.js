function Card(props)
{
  return(
    <div id={props.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid 1px black'}}>
      {/* <input type="checkbox"/> */}
      <p style={{fontWeight: "bold"}}>{props.firstName} {props.lastName}</p>
      <p>{props.jobTitle === undefined ? "Unmanaged" : props.jobTitle}</p>
      <p>{props.email}</p>
      <p>{props.phone}</p>
    </div>
  )
}

export default Card