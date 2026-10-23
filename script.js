document.addEventListener('DOMContentLoaded', () => {

    // ============================================================================
    // STEP 2: PERSISTENT NOTE-TAKING CONTROLLER ENGINE (LOCAL STORAGE)
    // ============================================================================
    const noteInput = document.getElementById('noteInput');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const notesContainer = document.getElementById('notesContainer');

    // Pull saved dataset array out of storage map bounds on initialization context
    let savedNotesList = JSON.parse(localStorage.getItem('mansiPortfolioNotes')) || [];

    function renderActiveNotes() {
        notesContainer.innerHTML = '';
        savedNotesList.forEach((noteText, arrayIndex) => {
            const card = document.createElement('div');
            card.classList.add('note-item');
            
            const p = document.createElement('p');
            p.textContent = noteText;
            card.appendChild(p);

            const delBtn = document.createElement('button');
            delBtn.textContent = '❌ Delete Note';
            delBtn.classList.add('delete-note-btn');
            delBtn.addEventListener('click', () => clearTargetNoteNode(arrayIndex));
            
            card.appendChild(delBtn);
            notesContainer.appendChild(card);
        });
    }

    function appendNewNoteRecord() {
        const text = noteInput.value.trim();
        if (text === '') {
            alert('Note description cannot be blank!');
            return;
        }
        savedNotesList.push(text);
        localStorage.setItem('mansiPortfolioNotes', JSON.stringify(savedNotesList));
        noteInput.value = '';
        renderActiveNotes();
    }

    function clearTargetNoteNode(targetIndex) {
        savedNotesList.splice(targetIndex, 1);
        localStorage.setItem('mansiPortfolioNotes', JSON.stringify(savedNotesList));
        renderActiveNotes();
    }

    saveNoteBtn.addEventListener('click', appendNewNoteRecord);
    renderActiveNotes(); // Fire initialization array render


    // ============================================================================
    // STEP 3: PRODUCT PIPELINE SYSTEM (FILTERING & SORTING LOGIC ARRAY)
    // ============================================================================
    const rawProductsDataset = [
        { name: "Mechanical Coding Keyboard", price: 120, category: "hardware" },
        { name: "Premium IDE Tool Cloud Pass", price: 45, category: "software" },
        { name: "Ultra-Wide 4K Developer Monitor", price: 450, category: "hardware" },
        { name: "Automated Deployment API Suite", price: 80, category: "software" },
        { name: "Ergonomic Office Coding Chair", price: 299, category: "hardware" }
    ];

    const categoryFilter = document.getElementById('categoryFilter');
    const priceSort = document.getElementById('priceSort');
    const productsGrid = document.getElementById('productsGrid');

    function executeProductPipeline() {
        let activeFilterValue = categoryFilter.value;
        let activeSortValue = priceSort.value;

        // 1. Process Filtering parameters transformation stage
        let filteredResults = rawProductsDataset.filter(product => {
            if (activeFilterValue === 'all') return true;
            return product.category === activeFilterValue;
        });

        // 2. Process Sorting mathematical boundary condition rules
        if (activeSortValue === 'low-high') {
            filteredResults.sort((itemA, itemB) => itemA.price - itemB.price);
        } else if (activeSortValue === 'high-low') {
            filteredResults.sort((itemA, itemB) => itemB.price - itemA.price);
        }

        // 3. Render compiled nodes output metrics onto layout canvas
        renderProductsView(filteredResults);
    }

    function renderProductsView(productsArray) {
        productsGrid.innerHTML = '';
        
        if (productsArray.length === 0) {
            productsGrid.innerHTML = '<p style="color:#64748b; font-size:13px;">No items match selected query boundaries.</p>';
            return;
        }

        productsArray.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-item-card');

            card.innerHTML = `
                <h4>${product.name}</h4>
                <span class="product-cat-tag">${product.category.toUpperCase()}</span>
                <div class="product-price">$${product.price}</div>
            `;
            productsGrid.appendChild(card);
        });
    }

    // Attach interaction mapping listeners to select menus
    categoryFilter.addEventListener('change', executeProductPipeline);
    priceSort.addEventListener('change', executeProductPipeline);
    
    executeProductPipeline(); // Trigger baseline render setup array mapping metrics
});