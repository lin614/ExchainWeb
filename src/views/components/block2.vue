<template>
    <div class="block2">
        <div class="cards">
            <Row type="flex" justify="space-between" :gutter="16">
                <Col span="8">
                <Card>
                    <ul slot="title" style="height:85px">
                        <li>
                            第一条通告
                        </li>
                        <li>
                            第二条通告
                        </li>
                    </ul>
                </Card>
                </Col>
                <Col span="8">
                <Card :bordered="true">
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                </Col>
                <Col span="8">
                <Card :bordered="true">
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                </Col>
            </Row>

        </div>
        <div class="tbs">
            <Card padding="0">
                <div slot="title" class="tbs_head">
                    <div class="linepot" />
                    <span class="title">
                        主区
                    </span>
                </div>

                <Table size="large" :columns="columns1" :data="data1" stripe="true"></Table>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'block2',
  data() {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
.block2 {
  background: transparent;
  min-height: 600px;
  width: 1200px;
  margin: 0 auto;
  height: 700px;
  text-align: left;
  font-size: @fontsize;
}
.ivu-card {
  border-radius: 0px;
  min-height: 150px;
  //   background:
}
.block2 .tbs_head {
  display: flex;
  height: 60px;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
}
.ivu-card-body {
  padding: 0;
}
.tbs {
  margin-top: 16px;
}
.tbs .title {
  font-size: @fontsize*2;
  //   font-weight: bold;
  margin-left: @fontsize;
}
.linepot {
  width: 5px;
  height: @fontsize*2;
  margin-left: -16px;
  //   display: inline-block;
  background-color: #13b387;
}
.ivu-table-wrapper {
  border: none;
}
</style>


