import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICodeValues } from '@/shared/model/code-values.model';
import CodeValuesService from './code-values.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CodeValuesDetails extends Vue {
  @Inject('codeValuesService') private codeValuesService: () => CodeValuesService;
  @Inject('alertService') private alertService: () => AlertService;

  public codeValues: ICodeValues = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.codeValuesId) {
        vm.retrieveCodeValues(to.params.codeValuesId);
      }
    });
  }

  public retrieveCodeValues(codeValuesId) {
    this.codeValuesService()
      .find(codeValuesId)
      .then(res => {
        this.codeValues = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
