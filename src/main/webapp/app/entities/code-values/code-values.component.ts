import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICodeValues } from '@/shared/model/code-values.model';

import CodeValuesService from './code-values.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class CodeValues extends Vue {
  @Inject('codeValuesService') private codeValuesService: () => CodeValuesService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public codeValues: ICodeValues[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCodeValuess();
  }

  public clear(): void {
    this.retrieveAllCodeValuess();
  }

  public retrieveAllCodeValuess(): void {
    this.isFetching = true;
    this.codeValuesService()
      .retrieve()
      .then(
        res => {
          this.codeValues = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ICodeValues): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCodeValues(): void {
    this.codeValuesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('vueappApp.codeValues.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCodeValuess();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
