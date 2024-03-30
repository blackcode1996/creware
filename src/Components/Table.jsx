import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const TableData = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => setData(json.products));
  }, []);

  function sortByBrand() {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sortedProducts = [...data].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.brand.localeCompare(b.brand);
      } else {
        return b.brand.localeCompare(a.brand);
      }
    });
    setData(sortedProducts);
  }

  console.log(sortOrder);

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Products Data</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th style={{ cursor: "pointer" }} onClick={sortByBrand}>
                Brand{" "}
                {sortOrder === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                )}
              </Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Discount Percentage</Th>
            </Tr>
          </Thead>

          {data.map((goods, id) => (
            <Tbody key={id}>
              <Tr>
                <Td>{goods.title}</Td>
                <Td>{goods.brand}</Td>
                <Td>{goods.category}</Td>
                <Td>{goods.description}</Td>
                <Td>{goods.discountPercentage}</Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableData;
