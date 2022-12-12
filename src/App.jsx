import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BasicModal from './Modal'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {


  const [data, setData] = useState([])
  const [item, setItem] = useState("");
  const [charge, setcharge] = useState("");
  const [toggleBtn, setToggleBtn] = useState(true);
  const [index, setIndex] = useState(null);
  const [update, setupdate] = useState(false)
  const [totalCount, setTotalCount] = useState(0);



  // Add Function
  const addItemFunc = () => {
    if (charge === "" || item === "") {
      alert("Please Fill Values")
    }

    else if (update) {

      data.splice(index, 1, { itemName: item, itemPrice: charge });
      setData(data);
      setupdate(false);
      setToggleBtn(true);
      setTotalCount(totalCount + Number(charge))
    }
    else {

      // For Adding
      setTotalCount(totalCount + Number(charge))
      setData((addItem) => {
        let data = [...addItem, { itemName: item, itemPrice: Number(charge), time: new Date().getTime() }]
        return data;
      })
    }
    setItem("");
    setcharge("");
  }

  // Function For Delete Item
  const deleteFunc = (e, price) => {
    let removeItem = data.filter((currentEl) => {
      return currentEl.time !== e
    })
    setData(removeItem)
    setTotalCount(totalCount - price.itemPrice)
  }

  // Function or Edit Item
  const editFunc = (e, ind,line) => {
    console.log(line)
    // setToggleBtn(false)
    // setIndex(ind);
    // setupdate(true);
    // setItem(e.itemName);
    // setcharge(e.itemPrice);
    // setTotalCount(totalCount - e.itemPrice)
  }

  // Clear All Function
  const clearAllFunc = () => {
    setData([])
    setTotalCount(0)
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col text-center fs-1 fw-bold task-name mt-3">
            Budget 🔥 Calculator
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card bg-white px-5 pt-2 shadow">
              <div className="contaier">
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control item" id="floatingInput" placeholder="abcd" onChange={(e) => setItem(e.target.value)} value={item} />
                      <label htmlFor="floatingInput" className='fw-bold'>Item😃</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input type="number" className="form-control charge" id="floatingInput" placeholder="abcd" onChange={(e) => setcharge(e.target.value)} value={charge} />
                      <label htmlFor="floatingInput" className='fw-bold'>Charges💸</label>
                    </div>
                  </div>
                </div>

                {/* Add Btn */}
                <div className="row mb-3">
                  <div className="col text-center">
                    <button className="add-item" onClick={addItemFunc}>{toggleBtn ? "Add Item" : "Updated Item"}</button>
                  </div>
                </div>

                {
                  data?.map((currentEl, index) => {
                    return (
                      <div className="row shadow bg-dark text-light my-3 py-1 rounded" key={index}>
                        <div className="col-5">{currentEl.itemName}</div>
                        <div className="col-4 text-start">{currentEl.itemPrice}</div>
                        <div className="col-3 text-end">
                          <DeleteForeverIcon onClick={() => deleteFunc(currentEl.time, currentEl)} style={{ marginBottom: "4px" }} />
                          <ModeEditOutlineOutlinedIcon onClick={() => { editFunc(currentEl, index,this) }} style={{ marginBottom: "4px" }} />
                        </div>
                      </div>
                    )

                  })
                }

                <div className="row">
                  <div className="col fs-3 fw-bold text-center">
                    Total Amount: <span className="amount">{totalCount}</span>
                  </div>
                </div>



                {
                  data.length > 0 ? <div className="row mb-3">
                    <div className="col text-center d-flex justify-content-around">
                      <button className="add-item mx-1 my-1" onClick={clearAllFunc}>Clear All ❌</button>
                      <BasicModal data={data} className="list-btn"/>
                    </div>
                  </div> : null
                }



              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
