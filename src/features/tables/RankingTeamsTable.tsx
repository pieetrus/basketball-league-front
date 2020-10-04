import React, { useMemo } from "react";
import { Column, useTable, useResizeColumns } from "react-table";
import styled from "styled-components";
import { ITeamSeason } from "../../app/models/teamSeason";

const RankingTeamsTable: React.FC<{ teams: ITeamSeason[] }> = ({ teams }) => {
  const makeData = () => {
    let i = 1;
    let data = teams.map((team) => ({
      position: i++,
      gp: team.wins + team.lost,
      w: team.wins ?? 0,
      l: team.lost ?? 0,
      team: team.team.name,
      pts: team.rankingPoints,
    }));
    return data;
  };

  const data = useMemo(() => makeData(), []);

  const columns: Column<{
    position: number;
    team: string;
    gp: number;
    w: number;
    l: number;
    pts: number;
  }>[] = useMemo(
    () => [
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "GP",
        accessor: "gp",
      },
      {
        Header: "W",
        accessor: "w",
      },
      {
        Header: "L",
        accessor: "l",
      },
      {
        Header: "Team",
        accessor: "team",
      },
      {
        Header: "PTS",
        accessor: "pts",
      },
    ],
    []
  );
  const tableInstance = useTable({ columns, data }, useResizeColumns);

  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0;
      border: 1px solid black;

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
  `;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default RankingTeamsTable;
