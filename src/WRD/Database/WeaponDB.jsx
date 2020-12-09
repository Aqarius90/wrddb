import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FilterField } from "./Database";


function WeaponDB({ allWeapons }) {
  const [fweapons, setfWeapons] = useState(allWeapons);

  function showRow(e, i) {
    return (
      <tr key={i} onClick={() => setDetail(e)}>
          <WeaponRow x={e} i={i}></WeaponRow>
      </tr>
    );
  }
  const [detail, setDetail] = useState(null);

  /*pagination*/
  let pPage = 10;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.ceil(allWeapons.length / pPage));
  function setFilter(x) {
    setPages(Math.ceil(x.length / pPage));
    setPage(0);
    setfWeapons(x);
  }
  let pageWeapons = [];
  for (
    let i = page * pPage;
    i < Math.min((page + 1) * pPage, fweapons.length);
    i++
  ) {
    pageWeapons.push(fweapons[i]);
  }
  let handlePageClick = data => {
    setPage(data.selected);
  };

  return (
    <>
      <div className="card">
        <FilterField items={allWeapons} set={setFilter}></FilterField>
        <div className="row">
          <div className="col-12">
            <table className="sortable table-hover table-bordered table-responsive text-center">
              <tbody>
                <tr>
                  <th> Weapon </th>
                  <th> Caliber </th>
                  <th> Accuracy </th>
                  <th> Stabilizer </th>
                  <th> Aimtime </th>
                  <th> DispersionMin </th>
                  <th> DispersionMax </th>
                  <th> RangeGround </th>
                  <th> RangeHelicopters </th>
                  <th> RangePlanes </th>
                  <th> AP </th>
                  <th> HE </th>
                  <th> Unit </th>
                </tr>
                {pageWeapons.map((e, i) => showRow(e, i))}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <p>{JSON.stringify(detail)}</p>
          </div>
            {/*<WeaponCard detail={detail} setDetail={setDetail} />*/}
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

export function WeaponRow({ x, i }) {
  try {
    return (
      <React.Fragment>
        <td key={i}>{x.Name}</td>
        <td>{x.Caliber}</td>
        <td>{x.HitProbability*100}</td>
        <td>{x.HitProbabilityWhileMoving*100}</td>
        <td>{x.AimTime}</td>
        <td>{x.DispersionAtMinRange ? x.DispersionAtMinRange : "N/A"}</td>
        <td>{x.DispersionAtMaxRange ? x.DispersionAtMaxRange : "N/A"}</td>
        <td>{x.RangeGround?x.RangeGround:0}</td>
        <td>{x.RangeHelicopters?x.RangeHelicopters:0}</td>
        <td>{x.RangePlanes?x.RangePlanes:0}</td>
        <td>{x.AP?x.AP:"0"}</td>
        <td>{x.HE?x.HE:"0"}</td>
        <td>{x.unitName}</td>
      </React.Fragment>
    );
  } catch (error) {
    global.throw("Weapon DB invalid", x, error);
    return <React.Fragment></React.Fragment>;
  }
}
export default WeaponDB;
