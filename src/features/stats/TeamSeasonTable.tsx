import React, { useMemo } from "react";
import { Column, useTable, useResizeColumns } from "react-table";
import styled from "styled-components";
import { ITeamSeason } from "../../app/models/teamSeason";

const TeamSeasonTable: React.FC<{ teamsSeason: ITeamSeason[] }> = ({
  teamsSeason,
}) => {
  const makeData = () => {
    let data = teamsSeason.map((team) => ({
      team: team.team.name,
      pts: team.pts,
      fg: team.fgm + " - " + team.fga,
      fgprc:
        team.fga !== 0 ? ((team.fgm / team.fga) * 100).toPrecision(3) : "0",
      p2: team.fg2a + " - " + team.fg2m,
      p2prc:
        team.fg2a !== 0 ? ((team.fg2m / team.fg2a) * 100).toPrecision(3) : "0",
      p3: team.fg3m + " - " + team.fg3a,
      p3prc:
        team.fg3a !== 0 ? ((team.fg3m / team.fg3a) * 100).toPrecision(3) : "0",
      ft: team.ftm + " - " + team.fta,
      ftprc:
        team.fta !== 0 ? ((team.ftm / team.fta) * 100).toPrecision(3) : "0",
      orb: team.orb,
      drb: team.drb,
      trb: team.trb,
      ast: team.ast,
      stl: team.stl,
      tov: team.tov,
      block: team.blk,
      fouls: team.fouls,
    }));
    return data;
  };

  const data = useMemo(() => makeData(), []);

  const columns: Column<{
    team: string;
    pts: number;
    fg: string;
    fgprc: string;
    p2: string;
    p2prc: string;
    p3: string;
    p3prc: string;
    ft: string;
    ftprc: string;
    orb: number;
    drb: number;
    trb: number;
    ast: number;
    stl: number;
    tov: number;
    block: number;
    fouls: number;
  }>[] = useMemo(
    () => [
      {
        Header: "Team",
        accessor: "team",
      },
      {
        Header: "PTS",
        accessor: "pts",
      },
      {
        Header: "FG",
        accessor: "fg",
        width: 1250,
      },
      {
        Header: "FG%",
        accessor: "fgprc",
      },
      {
        Header: "2P",
        accessor: "p2",
      },
      {
        Header: "2P%",
        accessor: "p2prc",
      },
      {
        Header: "3P",
        accessor: "p3",
      },
      {
        Header: "3P%",
        accessor: "p3prc",
      },
      {
        Header: "FT",
        accessor: "ft",
      },
      {
        Header: "FT%",
        accessor: "ftprc",
      },
      {
        Header: "ORB",
        accessor: "orb",
      },
      {
        Header: "DRB",
        accessor: "drb",
      },
      {
        Header: "TRB",
        accessor: "trb",
      },
      {
        Header: "AST",
        accessor: "ast",
      },
      {
        Header: "STL",
        accessor: "stl",
      },
      {
        Header: "TOV",
        accessor: "tov",
      },
      {
        Header: "BLK",
        accessor: "block",
      },
      {
        Header: "F",
        accessor: "fouls",
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
      width: 1300px;

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

export default TeamSeasonTable;
