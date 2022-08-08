# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Epic: Custom ID for Agents

(Add project context; why our users are requesting this, any historical context on previous attempts or solutions)

Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

User stories:
As a facility user, I would like to assign agents a custom id
As a facility user, I would like to see my agents custom id’s in my shift report PDF


### Task 1: Add DB table to support custom id for agents

Currently, Agents have an ID primary key in the Agents table.

Our data model needs to support an additional custom ID that a facility can associate with an agent.

Custom IDs should be unique at the facility level
- This means a facility cannot have duplicate customIds for agents
- Two facilities can assign the same customId to a single agent

Criteria:
1. agent_custom_id table exists with the following columns:
id (primary key)
facility_id (foreign key)
agent_id (foreign key)
custom_id (string)

2. The table has a composite unique constraint on the (facility_id, custom_id) pair.

### Task 2: Add a method for facilities to create an Agent custom ID

Facilities need a way to create customIds for Agents. Add a controller & service method to create records in the agent_custom_id table.

Criteria:
1. A controller method exists to support:
POST facility/:facilityId/agents/:agentId/custom-id
body: { customId: string }

2. A service method creates a custom id record in the database:createAgentCustomId(facilityId, agentId, customId)

### Task 3: Return custom agent id in getShiftsByFacility

Currently, getShiftsByFacility is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each. Add the customId field to the Agent metadata returned by getShiftsByFacility.

Criteria:
1. getShiftsByFacility returns Agent data that includes customId: null | string

### Task 4: Add customId column in shift report PDF

generateReport is currently called with a list of Shifts & converts them into a PDF.

Add a new column to the shift report PDF that displays the custom id of the agent assigned to the shift

(Include screenshot / mock of updated report)

Criteria:
1. generateReport creates a shift report PDF that includes a customId column that shows the custom id of the agent assigned to each shift