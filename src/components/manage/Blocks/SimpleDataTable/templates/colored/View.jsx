import React from 'react';
import { Icon } from '@plone/volto/components';
import { Table, Menu } from 'semantic-ui-react';
import RenderComponent from 'volto-datablocks/components/manage/Blocks/SimpleDataTable/components';
import cx from 'classnames';

import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';

import './style.less';

const View = (props) => {
  const {
    data = {},
    pagination = {},
    updatePagination = () => {},
    getAlignmentOfColumn,
    getTitleOfColumn,
    getNameOfColumn,
    selectedColumns,
    tableData,
    provider_data,
    has_pagination,
    show_header,
    row_size,
  } = props;

  const { td_color } = data;

  const getColorOfTableCell = (i) => {
    return selectedColumns
      .map((col) => {
        const column = col.column;
        const cell = td_color?.find(
          (c) => c.label === provider_data[column][i],
        );
        return cell?.color;
      })
      .filter((v) => v);
  };

  const getColorOfField = (field, index) => {
    return td_color.filter(
      (td) => td.label === tableData[field.column][index],
    )[0]?.color;
  };

  return (
    <div className="colored-table-v2">
      {row_size ? (
        <Table
          textAlign="left"
          striped={data.striped}
          className={`unstackable ${data.bordered ? 'no-borders' : ''}
          ${data.compact_table ? 'compact-table' : ''}`}
        >
          {show_header ? (
            <Table.Header>
              <Table.Row>
                {td_color && td_color.length > 0 && <Table.HeaderCell />}
                {selectedColumns.map((colDef, j) => (
                  <Table.HeaderCell
                    key={getNameOfColumn(colDef)}
                    className={getAlignmentOfColumn(colDef, j)}
                  >
                    {getTitleOfColumn(colDef)}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
          ) : null}
          <Table.Body>
            {Array(Math.max(0, row_size))
              .fill()
              .map((_, i) => (
                <Table.Row key={i}>
                  {selectedColumns.map((colDef, j) => {
                    const color = getColorOfField(colDef, i);
                    return (
                      <Table.Cell
                        className={cx({ colored: !!color })}
                        key={`${i}-${getNameOfColumn(colDef)}`}
                        textAlign={getAlignmentOfColumn(colDef, j)}
                        style={color ? { color } : {}}
                      >
                        {color ? (
                          <span
                            style={{ backgroundColor: color }}
                            className="bullet"
                          />
                        ) : (
                          ''
                        )}
                        <RenderComponent
                          tableData={tableData}
                          colDef={colDef}
                          row={i}
                          {...props}
                        />
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
          </Table.Body>
          {has_pagination ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell
                  colSpan={selectedColumns.length}
                  style={{ textAlign: 'center' }}
                >
                  <Menu pagination>
                    <Menu.Item
                      as="a"
                      icon
                      disabled={props.isPending || pagination.activePage === 1}
                      onClick={() => {
                        if (pagination.activePage > 1) {
                          updatePagination({
                            activePage: pagination.activePage - 1,
                          });
                        }
                      }}
                    >
                      <Icon name={leftSVG} size="24px" />
                    </Menu.Item>
                    <Menu.Item
                      as="a"
                      icon
                      disabled={
                        props.isPending ||
                        row_size < pagination.itemsPerPage ||
                        pagination.activePage * pagination.itemsPerPage >=
                          pagination.maxItems
                      }
                      onClick={() => {
                        if (row_size === pagination.itemsPerPage) {
                          updatePagination({
                            activePage: pagination.activePage + 1,
                          });
                        }
                      }}
                    >
                      <Icon name={rightSVG} size="24px" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          ) : null}
        </Table>
      ) : (
        'No results'
      )}
    </div>
  );
};

export default View;
