"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/components/ui/styled-components";
import { MainBtn } from "@/components/ui/Buttons";
import useHttp from "@/lib/hooks/useHttp";
import { notifyError, notifySuccess } from "@/lib";

const EditMerch: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    fetchData: getMerch,
    data: merch,
    loading: merchLoading,
    isSuccess: merchSuccess,
    error: merchError,
  } = useHttp(`merch/${id}`, "GET");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [soldout, setSoldOut] = useState(false);

  const {
    fetchData: editMerch,
    loading,
    isSuccess,
    isError,
    error,
  } = useHttp(
    `merch/edit/${id}`,
    "POST",
    {
      id,
      name,
      category,
      price,
      sizes,
      images,
      soldout,
    },
    true
  );

  useEffect(() => {
    getMerch();
  }, []);

  useEffect(() => {
    if (merchSuccess && merch) {
      setName(merch.name);
      setCategory(merch.category);
      setPrice(merch.price);
      setSizes(merch.sizes?.join(" ") || "");
      setSoldOut(merch.soldout);
    }
  }, [merchSuccess, merch]);

  useEffect(() => {
    if (merchError) {
      notifyError("Merch not found");
      router.replace(`/`);
    }
  }, [merchError]);

  useEffect(() => {
    if (isError) {
      notifyError((error as any)?.message || "Something went wrong");
    }

    if (isSuccess) {
      notifySuccess("Merch updated successfully");
      router.replace(`/merch/${id}`);
    }
  }, [isError, isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputSizes = sizes.trim().split(/\s+/).filter(Boolean);
    const storedSizes = merch?.sizes || [];

    const sameSizes =
      inputSizes.length === storedSizes.length &&
      inputSizes.every((size) => storedSizes.includes(size)) &&
      storedSizes.every((size: string) => inputSizes.includes(size));

    if (!name || !category || !price || !sizes) {
      notifyError("All fields must be properly filled");
      return;
    } else if (
      name === merch?.name &&
      price === merch?.price &&
      sameSizes &&
      soldout === merch?.soldout &&
      !images
    ) {
      notifyError("No changes made");
      return;
    }

    editMerch();
  };

  if (merchLoading || !merch) {
    return (
      <Style>
        <p>Loading merch...</p>
      </Style>
    );
  }

  return (
    <Style>
      <h3>Edit Merch</h3>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Sizes</label>
          <input
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="e.g. S M L XL"
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <div className="soldout-marker">
          <label>Mark as Sold Out</label>{" "}
          <input
            type="checkbox"
            checked={soldout}
            onChange={(e) => setSoldOut(e.target.checked)}
          />
        </div>

        <MainBtn type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </MainBtn>
      </Form>
    </Style>
  );
};

export default EditMerch;

const Style = styled.div`
  padding: 30px;
  display: grid;
  place-items: center;

  .soldout-marker {
    display: flex;
    align-items: center;
    margin-top: 10px;
    input {
      width: 20px;
      transform: translateY(-2px);
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;
