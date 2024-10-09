import React, { useMemo } from 'react';
import Card from '../Card';
import './column.css';
import { GrAdd } from 'react-icons/gr';
import { LuMoreHorizontal } from 'react-icons/lu';
// import { getPriorityIcon, getStatusIcon } from '../../utils/helper';
// import UserIcon from '../UserIcon';
function Column({ tickets, grouping, groupBy, userIdToData }) {
  
  // Memoize the title based on the grouping
  const title = useMemo(() => {
    if (grouping === 'status' || grouping === 'priority') {
      return groupBy;
    }
    if (grouping === 'user' && userIdToData[groupBy]) {
      return userIdToData[groupBy]?.name || 'Unknown User';
    }
  }, [grouping, groupBy, userIdToData]);

  // Memoize the icon based on the grouping
//   const icon = useMemo(() => {
//     if (grouping === 'status') {
//       return getStatusIcon(groupBy);
//     }
//     if (grouping === 'priority') {
//       return getPriorityIcon(groupBy);
//     }
//     if (grouping === 'user' && userIdToData[groupBy]) {
//       return (
//         <UserIcon
//           name={userIdToData[groupBy]?.name || 'Unknown'}
//           available={userIdToData[groupBy]?.available}
//         />
//       );
//     }
//   }, [grouping, groupBy, userIdToData]);

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left-container">
          {/* {icon} */}
          <div className="column-title">
            {title}
            <span className="count">{tickets.length}</span>
          </div>
        </div>
        <div className="column-header-right-container">
          <GrAdd color="#797d84" size={12} />
          <LuMoreHorizontal color="#797d84" size={14} />
        </div>
      </div>

      <div className="cards-container">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            userData={userIdToData[ticket.userId]}
            hideStatusIcon={grouping === 'status'}
            hideProfileIcon={grouping === 'user'}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
