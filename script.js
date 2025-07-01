document.addEventListener('DOMContentLoaded', function() {
    // 获取所有输入元素
    const inputs = document.querySelectorAll('input, select');
    const calculateBtn = document.getElementById('calculate');

    // 为所有输入添加事件监听器
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.type === 'number') {
                if (input.value < 0) input.value = 0;
                if (input.hasAttribute('max') && input.value > input.max) {
                    input.value = input.max;
                }
            }
        });
    });

    // 计算按钮点击事件
    calculateBtn.addEventListener('click', calculateCosts);

    // 成本计算函数
    function calculateCosts() {
        // 获取所有输入值
        const modelWeight = parseFloat(document.getElementById('modelWeight').value) || 0;
        const printTime = parseFloat(document.getElementById('printTime').value) || 0;
        const materialPrice = parseFloat(document.getElementById('materialPrice').value) || 0;
        const materialWaste = parseFloat(document.getElementById('materialWaste').value) || 0;
        const printerCost = parseFloat(document.getElementById('printerCost').value) || 0;
        const powerConsumption = parseFloat(document.getElementById('powerConsumption').value) || 0;
        const electricityPrice = parseFloat(document.getElementById('electricityPrice').value) || 0;
        const postProcessing = parseFloat(document.getElementById('postProcessing').value) || 0;
        const serviceFee = parseFloat(document.getElementById('serviceFee').value) || 0;
        const shippingFee = parseFloat(document.getElementById('shippingFee').value) || 0;
        const tax = parseFloat(document.getElementById('tax').value) || 0;

        // 计算材料成本（包含损耗）
        const materialCost = (modelWeight / 1000) * materialPrice * (1 + materialWaste / 100);

        // 计算电费
        const electricityCost = powerConsumption * electricityPrice * printTime;

        // 计算设备成本
        const equipmentCost = printerCost * printTime;

        // 计算其他费用（后处理费+服务费+运费）
        const otherCosts = postProcessing + serviceFee + shippingFee;

        // 计算总成本（包含税费）
        const subtotal = materialCost + electricityCost + equipmentCost + otherCosts;
        const totalCost = subtotal * (1 + tax / 100);

        // 更新显示结果
        updateResults({
            materialCost,
            electricityCost,
            equipmentCost,
            otherCosts,
            totalCost
        });
    }

    // 更新结果显示
    function updateResults(results) {
        document.getElementById('materialCost').textContent = results.materialCost.toFixed(2);
        document.getElementById('electricityCost').textContent = results.electricityCost.toFixed(2);
        document.getElementById('equipmentCost').textContent = results.equipmentCost.toFixed(2);
        document.getElementById('otherCosts').textContent = results.otherCosts.toFixed(2);
        document.getElementById('totalCost').textContent = results.totalCost.toFixed(2);
    }
}); 