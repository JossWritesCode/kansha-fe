import React from 'react';
import OrgEmployees from './OrgEmployees';

/*
	The organization's employees. With `selectedIds`/`onToggle` the rows get
	checkboxes for picking team members; otherwise admins can delete rows.
*/
const OrganizationEmployeesTable = ({
	employees,
	setEmployees,
	selectedIds,
	onToggle,
}) => {
	const selectable = Boolean(onToggle);
	return (
		<table className="employees-table">
			<tbody>
				{employees.map((employee) => (
					<OrgEmployees
						key={employee.id}
						employee={employee}
						selectable={selectable}
						selected={selectable && selectedIds.has(employee.id)}
						onToggle={onToggle}
						deletable={!selectable}
						setEmployees={setEmployees}
					/>
				))}
			</tbody>
		</table>
	);
};

export default OrganizationEmployeesTable;
