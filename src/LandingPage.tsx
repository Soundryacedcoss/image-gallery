import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './Slice/DataSlice'
import './LandingPage.css'
import { CircularProgress } from '@mui/material'
export const LandingPage = () => {
  const [isClicked, setIsCliked] = useState<any>(false)
  const [IsCommentClick, setIsCommentClick] = useState<any>(false)
  const [comment, setComment] = useState("")
  const dispatch: any = useDispatch()
  const data = useSelector((state: any) => state.DataSlice)
  useEffect(() => {
    dispatch(fetchData())

  }, [])
  // taking data from local storage
  let getData = JSON.parse(localStorage.getItem("Data") as string)
  // LIke functinality
  const LikeHandler = (val: any) => {
    for (let i = 0; i < getData.length; i++) {
      if (!isClicked && val === getData[i].data.id) {
        getData[i].liked1 = false;
        localStorage.setItem("Data", JSON.stringify(getData))
        setIsCliked(true)
      }
      else if (isClicked && val === getData[i].data.id) {
        getData[i].liked1 = true;
        localStorage.setItem("Data", JSON.stringify(getData))
        setIsCliked(false)

      }
    }
  }
  // Comment functionality
  const CommentHandler = (val: React.MouseEvent<HTMLButtonElement>) => {
    for (let i = 0; i < getData.length; i++) {
      if (!IsCommentClick && val === getData[i].data.id) {
        getData[i].comment = "block";
        localStorage.setItem("Data", JSON.stringify(getData))
        setIsCommentClick(true)
      }
      if (IsCommentClick && val === getData[i].data.id) {
        setIsCommentClick(false)
        getData[i].comment = "none";
        localStorage.setItem("Data", JSON.stringify(getData))
      }
    }
  }
  // Coment box 
  const CommentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  // Comment button functionality
  const CommentClickHandler = () => {
    alert("You have commented on post ")
    setComment(" ")
  }
  return (
    <div >
      <h2>Image Gallery</h2>
      {getData === null ? <CircularProgress /> : <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "4%" }}>
        {JSON.parse(localStorage.getItem("Data") as string).map((val: any) =>
          <div className="card imgCard" style={{ width: "18rem", margin: "1%" }} key={Math.random()}>
            <img src={val.data.src.original} className="card-img-top Image" alt="Image" />
            <div className="card-body">
              <button value={isClicked}
                onClick={() => LikeHandler(val.data.id)}
                className="LikeButton"
              >
                {val.liked1 ? <i className='fas fa-heart' style={{ fontSize: "36px" }}></i>
                  : <i className="fas fa-heart" style={{ fontSize: "36px", color: 'red' }}></i>}
              </button>
              <button value={IsCommentClick} onClick={() => CommentHandler(val.data.id)} className="LikeButton">
                <i className='far fa-comment' style={{ fontSize: "36px" }}></i>
              </button>
              <b style={{ display: val.comment }}>
                <input type="text" className="form-control" onChange={CommentInputHandler}
                  placeholder="write comment"
                  aria-label="Username"
                  aria-describedby="basic-addon1" />
                <button className='btn btn-info' onClick={CommentClickHandler}>Comment</button>
              </b>
            </div>
          </div>
        )}
      </div>}
    </div>
  )
}
