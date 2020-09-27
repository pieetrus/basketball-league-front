import React, { useMemo } from "react";
import { Column, useTable } from "react-table";
import { IPlayerMatch } from "../../app/models/playerMatch";

const PlayerMatchTable: React.FC<{ playerMatches: IPlayerMatch[] }> = ({
  playerMatches,
}) => {
  const makeData = () => {
    let data = playerMatches.map((player) => ({
      nr: player.player.jerseyNr,
      player: player.player.name + " " + player.player.surname,
      min: "00:00",
      pts: player.pts,
      fg: player.fgm + " - " + player.fga,
      fgprc: player.fga !== 0 ? (player.fgm / player.fga) * 100 : 0,
      p2: player.fg2a + " - " + player.fg2m,
      p2prc: player.fg2a !== 0 ? (player.fg2m / player.fg2a) * 100 : 0,
      p3: player.fg3m + " - " + player.fg3a,
      p3prc: player.fg3a !== 0 ? (player.fg3m / player.fg3a) * 100 : 0,
      ft: player.ftm + " - " + player.fta,
      ftprc: player.fta !== 0 ? (player.ftm / player.fta) * 100 : 0,
      orb: player.orb,
      drb: player.drb,
      treb: player.trb,
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
    nr: string;
    player: string;
    min: string;
    pts: number;
    fg: string;
    fgprc: number;
    p2: string;
    p2prc: number;
    p3: string;
    p3prc: number;
    ft: string;
    ftprc: number;
    orb: number;
    drb: number;
    treb: number;
    ast: number;
    stl: number;
    tov: number;
    block: number;
    fouls: number;
  }>[] = useMemo(
    () => [
      {
        Header: "Nr",
        accessor: "nr", // accessor is the "key" in the data
      },
      {
        Header: "Player",
        accessor: "player",
      },
      {
        Header: "Min",
        accessor: "min",
      },
      {
        Header: "PTS",
        accessor: "pts",
      },
      {
        Header: "FG",
        accessor: "fg",
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
        Header: "DREB",
        accessor: "drb",
      },
      {
        Header: "TREB",
        accessor: "treb",
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
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default PlayerMatchTable;
