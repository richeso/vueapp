import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICodeTables } from '@/shared/model/code-tables.model';

import CodeTablesService from './code-tables.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class CodeTables extends Vue {
  @Inject('codeTablesService') private codeTablesService: () => CodeTablesService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public codeTables: ICodeTables[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCodeTabless();
  }

  public clear(): void {
    this.retrieveAllCodeTabless();
  }

  public retrieveAllCodeTabless(): void {
    this.isFetching = true;
    this.codeTablesService()
      .retrieve()
      .then(
        res => {
          this.codeTables = res.data;
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

  public prepareRemove(instance: ICodeTables): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCodeTables(): void {
    this.codeTablesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('vueappApp.codeTables.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCodeTabless();
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
