import React, { useMemo } from "react";
import { Column, useTable, useResizeColumns } from "react-table";
import styled from "styled-components";
import { IPlayerSeason } from "../../app/models/playerSeason";

const PlayerSeasonTable: React.FC<{ playerSeasonArray: IPlayerSeason[] }> = ({
  playerSeasonArray,
}) => {
  const makeData = () => {
    let data = playerSeasonArray.map((player) => ({
      pos: player.position,
      player: player.name + " " + player.surname,
      teamName: player.teamName,
      pts: player.pts,
      fg: player.fgm + " - " + player.fga,
      fgprc:
        player.fga !== 0
          ? ((player.fgm / player.fga) * 100).toPrecision(3)
          : "0",
      p2: player.fg2a + " - " + player.fg2m,
      p2prc:
        player.fg2a !== 0
          ? ((player.fg2m / player.fg2a) * 100).toPrecision(3)
          : "0",
      p3: player.fg3m + " - " + player.fg3a,
      p3prc:
        player.fg3a !== 0
          ? ((player.fg3m / player.fg3a) * 100).toPrecision(3)
          : "0",
      ft: player.ftm + " - " + player.fta,
      ftprc:
        player.fta !== 0
          ? ((player.ftm / player.fta) * 100).toPrecision(3)
          : "0",
      orb: player.orb,
      drb: player.drb,
      trb: player.trb,
      ast: player.ast,
      stl: player.stl,
      tov: player.tov,
      block: player.blk,
      fouls: player.fouls,
    }));
    return data;
  };

  const data = useMemo(() => makeData(), []);

  const columns: Column<{
    pos: string;
    player: string;
    teamName: string;
    // min: string;
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
        Header: "Pos",
        accessor: "pos", // accessor is the "key" in the data
      },
      {
        Header: "Player",
        accessor: "player",
        width: 400,
      },
      {
        Header: "Team",
        accessor: "teamName",
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

export default PlayerSeasonTable;
