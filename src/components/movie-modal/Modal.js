import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import "./Modal.css";
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from "react";
import MainContext from "../../context/MainContext";
import YouTube from "react-youtube";

export default function BasicModal(props) {
  const handleClose = () => setOpen(false);
  const { data, open, setOpen, trailer } = props;
  const { genres } = useContext(MainContext);
  console.log(trailer);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90vw",
    height: "80vh",
    bgcolor: "#000",
    boxShadow: 24,
  };

  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal-content">
              <div className="modal-exit">
                <IoCloseSharp className="close-btn" onClick={handleClose} />
              </div>
              <div className="modal-trailer">
                <YouTube videoId={trailer} opts={opts} />
              </div>
              <div
                className="modal-info"
                style={{
                  background: `linear-gradient(transparent, black 90%), url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
                  backgroundSize: "cover",
                }}
              >
                <h1>{data.title}</h1>
                <p>{data.overview}</p>
                <div className="modal-ratings">
                  <div
                    className="modal-rating"
                    style={{
                      backgroundColor:
                        data.vote_average > 7 ? "green" : "orange",
                    }}
                  >
                    Rating: {data.vote_average}
                  </div>
                  <div className="modal-rating">Votes: {data.vote_count}</div>
                </div>
                <div className="modal-genres">
                  {data.genre_ids &&
                    data.genre_ids.map((genre) => {
                      return (
                        <div className="modal-genre" key={genre.id}>
                          {genres.map((g) => {
                            if (g.id === genre) {
                              return <div key={g.id}>{g.name}</div>;
                            }
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
