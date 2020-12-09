import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FilterField } from "./Database";
import {getPortrait, VetIcon } from "../../js/GUIparsers";

function UnitDB({ allUnits }) {
  const [fUnits, setfUnits] = useState(allUnits);

  function showRow(x, i) {
    return (
      <tr key={i} onClick={() => setDetail(x)}>
        <UnitRow x={x} i={i}></UnitRow>
      </tr>
    );
  }
  const [detail, setDetail] = useState(null);

  /*pagination*/
  let pPage = 10;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.ceil(allUnits.length / pPage));
  function setFilter(x) {
    setPages(Math.ceil(x.length / pPage));
    setPage(0);
    setfUnits(x);
  }
  let pageUnits = [];
  for (
    let i = page * pPage;
    i < Math.min((page + 1) * pPage, fUnits.length);
    i++
  ) {
    pageUnits.push(fUnits[i]);
  }
  let handlePageClick = data => {
    setPage(data.selected);
  };

  return (
    <>
      <div className="card">
        <FilterField items={allUnits} set={setFilter}></FilterField>
        <div className="row">
          <div className="col-12">
            <table className="sortable table-hover table-bordered table-responsive text-center">
              <tbody>
                <tr>
                  <th> </th>
                  <th> Unit </th>
                  <th> Price </th>
                  <th> ArmorFront </th>
                  <th> ArmorSides </th>
                  <th> ArmorRear </th>
                  <th> ArmorTop </th>
                  <th> Tab </th>
                  <th> Optics </th>
                  <th> Stealth </th>
                  <th> Speed </th>
                  <th> Stun/regen </th>
                  <th> Supply/TOT </th>
                </tr>
                {pageUnits.map((e, i) => showRow(e, i))}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <p>{JSON.stringify(detail)}</p>
          </div>
            {/*<UnitCard detail={detail} setDetail={setail} />*/}
        </div>
      </div>
      <div className="card">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"btn"}
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination btn-group btn-block"}
          subContainerClassName={"pages pagination"}
          pageClassName={"btn"}
          previousClassName={"btn"}
          nextClassName={"btn"}
          activeClassName={"btn active"}
          pageLinkClassName={"btn btn-block btn-outline-primary "}
          previousLinkClassName={"btn btn-block btn-outline-primary"}
          nextLinkClassName={"btn btn-block btn-outline-primary"}
          activeLinkClassName={"btn btn-block btn-outline-primary active"}
        />
      </div>
    </>
  );
}


function UnitRow({ x, i }) {
    try {
      return (
        <React.Fragment>
          <td>{getPortrait(x, "img-responsive")}</td>
          <td>{x.Name}</td>
          <td>{x.Price}</td>
          <td>{x.ArmorFront}</td>
          <td>{x.ArmorSides}</td>
          <td>{x.ArmorRear}</td>
          <td>{x.ArmorTop}</td>
          <td>{x.Tab}</td>
          <td>{x.OpticalStrengthGround + "/"+ x.OpticalStrengthAir}</td>
          <td>{x.Stealth}</td>
          <td>{x.MaxSpeed + "/" + (x.MovementType==="Wheeled"?"110":x.MovementType==="Tracked"?"150":x.MaxSpeed)}</td>
          <td>{x.StunDamageToGetStunned+"/" +x.StunDamageRegen}</td>
          <td>{x.Autonomy}</td>
        </React.Fragment>
      );
    } catch (error) {
      global.throw("Unit DB invalid", x, error);
      return <React.Fragment></React.Fragment>;
    }
  }


export default UnitDB;