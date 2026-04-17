import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridOptions } from 'ag-grid-community';
import { ThemeContext } from '../../App';
import { AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllEnterpriseModule]);
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-113850}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{1 January 2026}____[v3]_[0102]_MTc2NzIyNTYwMDAwMA==77931508b786a1519feb9ddef5f01e67");


interface DataGridProps {
  rowData: any[];
  columnDefs: ColDef[];
  gridOptions?: GridOptions;
}

const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs, gridOptions }) => {
  const { isDarkMode } = useContext(ThemeContext);


  return (
    <div
      className={isDarkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
      style={{ width: '100%', minHeight: '500px', flex: 1, border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, borderRadius: '8px', overflow: 'hidden' }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        domLayout="autoHeight"
        animateRows={true}
        enableCellTextSelection={true}
        suppressCellFocus={true}
        {...gridOptions}
      />
    </div>
  );
};

export default DataGrid;
