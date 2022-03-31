import * as React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: #F1D00A;
`;

export default function BasicCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  let [color, setColor] = useState("yellow");


  const retrieveApis = async () => {
    const response = await axios.get('http://localhost:3002/data')
    return response.data
  }



  useEffect(() => {
    const getAllApis = async () => {
      try {
        setLoading(true)
        const allApis = await retrieveApis()
        if (allApis) setData(allApis)
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }

    }
    getAllApis()
  }, [])
  const [searchTerm, setSearchTerm] = React.useState(' ')

  return (
    <div>
      <input type="text"
        placeholder="Search ..."
        style={{
          margin: "10px",
          width: "30%",
          height: "35px",
          border: "4px solid #F1D00A",
        }}
        onChange={event => { setSearchTerm(event.target.value) }}>
      </input>


      {loading ? <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} css={override} size={150} />
        <h1>Loading, please wait...</h1>
      </div>
        :
        <div style={{
          display: "flex",
          flexWrap: "wrap"
        }}>

          {data.filter((val) => {
            if (searchTerm === " ") { return val }
            else if (val.API.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map((val, key) => {
            return (

              <div key={key}
                style={
                  {
                    backgroundColor: "#132C33",
                    color: "#FFF",

                    border: "1px solid blue",
                    width: "30%",

                    margin: "9px",
                    padding: "7px"
                  }
                }>
                <h3>{val.API}</h3>
                <h5>{val.Category}</h5>
                <p>{val.Description}</p>
                <a href={val.Link} style={{ color: "#F1D00A" }}>Visit here for more</a>
              </div>
            )
          })}
        </div>}


    </div >

  );
}

