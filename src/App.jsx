import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {

  // Hook For All Data
  const [data, setData] = useState([])

  // Hook For Item
  const [item, setItem] = useState("");

  // Hook For Charge
  const [charge, setcharge] = useState("");

  // Hook For Toggle Button
  const [toggleBtn, setToggleBtn] = useState(true);

  // Toggle For Updated Button
  const [index, setIndex] = useState(null);

  // Hook For Condition
  const [update, setupdate] = useState(false)

  // Let Total Sum
  const [totalCount, setTotalCount] = useState(0);

  // const [totalNumber, setTotalNumber] = useState([])


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
  const editFunc = (e, ind) => {

    setToggleBtn(false)
    setIndex(ind);
    setupdate(true);
    setItem(e.itemName);
    setcharge(e.itemPrice);
  }

  // Clear All Function
  const clearAllFunc = () => {
    setData([])
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
                      <label htmlFor="floatingInput" className='fw-bold'>Item</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input type="number" className="form-control charge" id="floatingInput" placeholder="abcd" onChange={(e) => setcharge(e.target.value)} value={charge} />
                      <label htmlFor="floatingInput" className='fw-bold'>Charge</label>
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
                  data.map((currentEl, index) => {
                    return (
                      <div className="row shadow bg-dark text-light my-3 py-1 rounded" key={index}>
                        <div className="col">{currentEl.itemName}</div>
                        <div className="col text-end">{currentEl.itemPrice}
                          <DeleteForeverIcon onClick={() => deleteFunc(currentEl.time, currentEl)} style={{ marginBottom: "4px" }} />
                          <ModeEditOutlineOutlinedIcon onClick={() => { editFunc(currentEl, index) }} style={{ marginBottom: "4px" }} />
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



                <div className="row mb-3">
                  <div className="col text-center">
                    <button className="add-item" onClick={clearAllFunc}>Clear All</button>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
