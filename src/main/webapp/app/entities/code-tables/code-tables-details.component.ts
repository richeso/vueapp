import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICodeTables } from '@/shared/model/code-tables.model';
import CodeTablesService from './code-tables.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CodeTablesDetails extends Vue {
  @Inject('codeTablesService') private codeTablesService: () => CodeTablesService;
  @Inject('alertService') private alertService: () => AlertService;

  public codeTables: ICodeTables = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.codeTablesId) {
        vm.retrieveCodeTables(to.params.codeTablesId);
      }
    });
  }

  public retrieveCodeTables(codeTablesId) {
    this.codeTablesService()
      .find(codeTablesId)
      .then(res => {
        this.codeTables = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
