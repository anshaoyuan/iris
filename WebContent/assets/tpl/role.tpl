<fieldset id="needDel">
{each roleList as role}
	 	{if role.permission == null}
</fieldset>
	 		<fieldset>
				<legend>{role.name}</legend>
		{else}
		        <div class="floating">
		       		{role.name}  
		       		 <input id="{role.permission}_view" name="role[permissions][]" type="checkbox" value="{role.permission}:view"> 查看 </input>  
		       		<input id="{role.permission}_edit" name="role[permissions][]" type="checkbox" value="{role.permission}:edit"> 编辑 </input>
		        </div>
        {/if}
{/each}
</fieldset>