import React from "react";
import styled from "styled-components";
import { useTable, useBlockLayout, useResizeColumns, usePagination } from 'react-table'
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query, orderBy, limit, endAt, endBefore, startAt, startAfter } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAJe5xP5WeNJouwxy28eMnVbb547nyggqk",
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

initializeApp(firebaseConfig);


const Styles = styled.div`
  padding: 1rem;
  overflow:auto;
  table {
    display: block;
    overflow:auto;
    border-spacing: 0;
    border: 1px solid black;
    background-color:yellow;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    background-color:yellow;
  }
`

function Table() {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 150,
    }),
    []
  )

  const [products, setProducts] = useState([]);
  const [list, setList] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [isNextPage, setIsNextPage] = useState(null);

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'Products',
          columns:
            headers.map(x => {

              return {
                Header: x,
                accessor: x
              }
            })
        }
      ],
    [headers]
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    resetResizing,
  } = useTable(
    {
      columns,
      data: products,
      defaultColumn,
    },
    usePagination,
    useBlockLayout,
    useResizeColumns
  )


  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(getFirestore(), "products"), orderBy("AllowCustomerReviews"), limit(10));

      const querySnapshot = await getDocs(q);
      setList(querySnapshot.docs);

      let array = [];
      querySnapshot.forEach((doc) => {
        array.push(doc.data())
        setHeaders(Object.keys(doc.data()))

      });
      setProducts(array);

    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let q = null;

      isNextPage
        ? q = query(collection(getFirestore(), "products"), orderBy("AllowCustomerReviews"), startAt(list[list.length - 1]), limit(10))
        : q = query(collection(getFirestore(), "products"), orderBy("AllowCustomerReviews"), endBefore(list[0]), limit(10));

      const querySnapshot = await getDocs(q);
      setList(querySnapshot.docs);
      let array = [];
      querySnapshot.forEach((doc) => {
        array.push(doc.data())
      });
      setProducts(array);
    }

    if(isNextPage != null){
      fetchData();
      setIsNextPage(null)
    }

  }, [isNextPage]);

  const nextPage = async () => {
    setIsNextPage(true)
  }

  const previousPage = async () => {
    setIsNextPage(false)
  }

  return (
    <>
      <div className="pagination">
        <button style={{ height: "25px", width: "25px", backgroundColor: "red" }} onClick={() => previousPage()} >
          {'<'}
        </button>{' '}
        <button style={{ height: "25px", width: "25px", backgroundColor: "red" }} onClick={() => nextPage()}>
          {'>'}
        </button>{' '}
      </div>
      <table {...getTableProps({ style: { height: "800px", width: "80vp" } })}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps({ style: {} })}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps({ style: { height: "150px" } })}>
                {row.cells.map(cell => {
                  let style = {};
                  if (cell.column.id === "Description") {
                    style = { display: "block", overflow: "auto" };
                  }

                  return <td {...cell.getCellProps({ style })}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

    </>
  )

}

const DashBoard = () => {

  return (
    <Styles>
      <Table />
    </Styles>
  )
}

export default DashBoard
