import './Main.css';
import React from 'react';
import Card from './Card'

function Main() {

  const [employees, setEmployees] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [sortState, setSortState] = React.useState('none')
  const [columnSort, setColumnSort] = React.useState('firstName')
  

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`http://localhost:5000/data`)

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const jsonData = await response.json()
        setEmployees(jsonData)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [])

  function Search(data)
    {
        const keys = ["firstName", "lastName", "email", "phone"]
        return data.filter(item => 
            keys.some(key => item[key].toLowerCase().includes(search)) ||
            (item.jobTitle === undefined ? "unmanaged".includes(search) : item.jobTitle.toLowerCase().includes(search))
        )
    }

    function Sort(data)
    {
        const sortMethods = {
            none: { method: (a, b) => null },
            ascending: { method: (a, b) => ((a[columnSort] === undefined && columnSort === "jobTitle" ? 'Unmanaged' : a[columnSort]) > (b[columnSort] === undefined && columnSort === "jobTitle" ? 'Unmanaged' : b[columnSort]) ? 1 : -1) },
            descending: { method: (a, b) => ((a[columnSort] === undefined && columnSort === "jobTitle" ? 'Unmanaged' : a[columnSort])> (b[columnSort] === undefined && columnSort === "jobTitle" ? 'Unmanaged' : b[columnSort]) ? -1 : 1) },
        };
        return data.sort(sortMethods[sortState].method)
    }

  const prototype = employees && Sort(Search(employees)).map(item => {
    return(
      <Card 
        key = {item.id}
        {...item}
      />
    )
  })
  
  return (
    <>
      <div className='grid-div'>
        <div className='select-div'>
          <p>Seach</p>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />
          <p>Sort direction</p>
          <select onChange = {e => setSortState(e.target.value)}>
            <option value="none">None</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
          <p>Which value to sort</p>
          <select onChange = {e => setColumnSort(e.target.value)}>
            <option value="firstName">First name</option>
            <option value="lastName">Last name</option>
            <option value="phone">Phone number</option>
            <option value="email">Email</option>
            <option value="jobTitle">Job title</option>
          </select>
        </div>
        {isLoading && <p>Loading data...</p>}
        {error && <p>Error: {error}</p>}
        {employees && prototype}
      </div>
    </>
    
  );
}

export default Main;
