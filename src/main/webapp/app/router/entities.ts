import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const CodeTables = () => import('@/entities/code-tables/code-tables.vue');
// prettier-ignore
const CodeTablesUpdate = () => import('@/entities/code-tables/code-tables-update.vue');
// prettier-ignore
const CodeTablesDetails = () => import('@/entities/code-tables/code-tables-details.vue');
// prettier-ignore
const CodeValues = () => import('@/entities/code-values/code-values.vue');
// prettier-ignore
const CodeValuesUpdate = () => import('@/entities/code-values/code-values-update.vue');
// prettier-ignore
const CodeValuesDetails = () => import('@/entities/code-values/code-values-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/code-tables',
    name: 'CodeTables',
    component: CodeTables,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-tables/new',
    name: 'CodeTablesCreate',
    component: CodeTablesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-tables/:codeTablesId/edit',
    name: 'CodeTablesEdit',
    component: CodeTablesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-tables/:codeTablesId/view',
    name: 'CodeTablesView',
    component: CodeTablesDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-values',
    name: 'CodeValues',
    component: CodeValues,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-values/new',
    name: 'CodeValuesCreate',
    component: CodeValuesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-values/:codeValuesId/edit',
    name: 'CodeValuesEdit',
    component: CodeValuesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/code-values/:codeValuesId/view',
    name: 'CodeValuesView',
    component: CodeValuesDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
