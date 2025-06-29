"use client";

import { Grid } from "@mui/material";
import styled from "styled-components";
import { MerchProps } from "@/types/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { MainBtn } from "./Buttons";
import { addToCart } from "@/redux/slices/appSlice";
import Modal from "@mui/material/Modal";
import AddedToCartModal from "./AddedToCartModal";

interface Props {
  merch: MerchProps;
}

const SingleMerchPage: React.FC<Props> = ({ merch }) => {
  const [showCornfirmationModal, setshowConformationModal] = useState(false);

  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState("");

  const [quantity, setQuantity] = useState(1);

  const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };

  const incrementQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decrementQty = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((prevState) => prevState - 1);
  };

  useEffect(() => {
    if (merch.sizes) {
      setSize(merch.sizes[0]);
    } else {
      setSize("N/A");
    }
  }, []);

  const handleClick = () => {
    dispatch(addToCart({ merch, quantity, size }));
    setshowConformationModal(true);
    setTimeout(() => {
      handleClose();
    }, 850);
  };

  const handleClose = () => setshowConformationModal(false);

  return (
    <Container>
      <Modal
        open={showCornfirmationModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddedToCartModal />
      </Modal>
      <Grid container spacing={4} sx={{ padding: "auto 50px" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="lg-image-container">
            <Image
              src={activeImage || merch.images[0]}
              alt="poster"
              className="lg-image"
              width={300}
              height={300}
            />
          </div>

          <div className="small-image-container">
            {merch.images.map((image, i) => {
              return (
                <SmallImageWrapper $active={image === activeImage} key={i}>
                  <Image
                    src={image}
                    alt="poster"
                    className="image"
                    key={i}
                    width={500}
                    height={500}
                    onClick={() => {
                      setActiveImage(image);
                    }}
                  />
                </SmallImageWrapper>
              );
            })}
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ padding: " 30px" }}>
          {" "}
          <div>
            <h3>{merch.name}</h3>
            <p>₦{merch.price}</p>
            {merch.sizes && !isAdmin && (
              <SizeControl>
                <label>Size</label>
                <FormControl sx={{ width: 220, marginLeft: "50px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    onChange={handleChange}
                  >
                    {merch.sizes.map((size, i) => {
                      return (
                        <MenuItem value={size} key={i}>
                          {size}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </SizeControl>
            )}
            {!isAdmin && (
              <div className="qty-ctrl-container">
                <label>Quantity</label>
                <QuantityControl>
                  <div className="action" onClick={decrementQty}>
                    -
                  </div>
                  <div>{quantity}</div>
                  <div className="action" onClick={incrementQty}>
                    +
                  </div>
                </QuantityControl>
              </div>
            )}
          </div>
          <br />
          <MainBtn onClick={handleClick}>Add to Cart</MainBtn>
          {/* <MainBtn
            onClick={
              !isAdmin
                ? handleClick
                : () => {
                    navigate(`/edit-merch/${merch._id}`);
                  }
            }
            type="submit"
          >
            {isAdmin
              ? "Edit Merch"
              : // : inCart
                // ? "Remove from cart"
                "Add to cart"}
          </MainBtn> */}
          {/* {isAdmin && (
            <AltBtn
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              {deleteLoading ? "Deleting.." : "Delete Merch"}
            </AltBtn>
          )} */}
        </Grid>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 100px;
  padding: 10px;
  h3 {
    margin-bottom: 30px;
    color: #2e2e2e;
  }
  button {
    display: block;
    border-radius: 4px;
    margin: 10px auto;
    width: 100%;
    cursor: pointer;
  }
  .lg-image-container {
    display: grid;
    justify-content: center;
  }
  .small-image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
    @media (max-width: 410px) {
      grid-template-columns: repeat(3, 1fr);
    }

    .image {
      width: 100px;
      height: auto;
      @media (max-width: 840px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          align-self: flex-start;
        }
      }
    }

    .lg-image {
      width: 300px;
      height: 300px;

      @media (max-width: 500px) {
        width: 100%;
      }
    }

    .qty-ctrl-container {
      display: flex;
      justify-content: center;
    }
  }
`;

const SmallImageWrapper = styled.div<{ $active: boolean }>`
  cursor: pointer;
  border: ${(props) => (props.$active ? "3px solid purple" : "none")};
  border-radius: 10px;
  overflow: hidden;
  width: fit-content;
`;

const SizeControl = styled.div`
  display: flex;
  label {
    align-self: center;
  }
`;
const QuantityControl = styled.div`
  width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: fit-content;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
  display: inline-flex;
  justify-content: center;
  gap: 10px;
  margin-left: 23px;
  div,
  .action {
    margin: 0 10px;
    cursor: pointer;
  }
`;

export default SingleMerchPage;
